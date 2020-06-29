import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog_status: "",
            content: "",
            featured_image: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
        this.featuredImageRef = React.createRef();
    }

    componentWillMount() {
      if (this.props.editMode) {
        this.setState({
          id: this.props.blog.id,
          title: this.props.blog.title,
          status: this.props.blog.status
        });
      }
    }

    componentConfig() {
      return {
        iconFiletypes: [".jpg", ".png"],
        showFiletypeIcon: true,
        postUrl: "https://httpbin.org/post"
      };
    }
  
    djsConfig() {
      return {
        addRemoveLinks: true,
        maxFiles: 1
      };
    }
  
    handleFeaturedImageDrop() {
      return {
        addedfile: file => this.setState({ featured_image: file })
      };
    }

    handleRichTextEditorChange(content) {
      this.setState({
        content: content 
      })
    }

    buildForm() {
        let formData = new FormData();
      
        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[blog_content]", this.state.content);

        if (this.state.featured_image) {
          formData.append(
            "portfolio_blog[featured_image]",
            this.state.featured_image
          );
        }
      
        return FormData;
      }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(
            "https://nicholasasharp.devcamp.space/portfolio/portfolio_blogs",
            this.buildForm(),
            { withCredentials: true }
          ).then(response => {
            if (this.state.featured_image) {
              this.featuredImageRef.current.dropzone.removeAllFiles();
            }
            this.setState({
                id: "",
                title: "",
                blog_status: "",
                content: "",
                featured_image: ""
              });

              this.props.handleSuccessfulFormSubmission(
                response.data.portfolio_blog
              );
          })
          .catch(error => {
            console.log("handleSubmit for blog error", error);
          });

        
      }
      

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
          })
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div className="two-column">
                <input 
                    onChange={this.handleChange} 
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={this.state.title}
                 />
                 <input
                    type="text"
                    onChange={this.handleChange}
                    name="blog_status"
                    placeholder="Blog status"
                    value={this.state.blog_status}
                />
                <div className="one-column">
                  <RichTextEditor 
                   handleRichTextEditorChange={this.handleRichTextEditorChange}
                   contentToEdit={
                    this.props.editMode && this.props.blog.content
                      ? this.props.blog.content
                      : null
                  }
                   />
                </div>
                </div>
                <div className="image-uploaders">
                {this.props.editMode && this.props.blog.featured_image_url ? (
                  <div className="portfolio-manager-image-wrapper">
                    <img src={this.props.blog.featured_image_url} />

                    <div className="image-removal-link">
                      <a>Remove file</a>
                    </div>
                  </div>
                ) : (
                  <DropzoneComponent
                    ref={this.featuredImageRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleFeaturedImageDrop()}
                  >
                    <div className="dz-message">Featured Image</div>
                  </DropzoneComponent>
                )}
              </div>
                <button>Save</button>
            </form>
        )
    }
}
