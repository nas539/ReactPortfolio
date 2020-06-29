import React from 'react';
import profilePicture from "../../../static/assets/bio/IMG_0699.jpg"

export default function() {
    return (
        <div className="content-page-wrapper">
            <div 
            className="left-column"
            style={{
                background: "url(" + profilePicture + ") no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
 
            }}
            />
            <div className="right-column">
            Enthusiastic software engineer, that is always eager to learn and use new technologies. 
            My passion is solving problems, either through communication or through code.
            Creative by nature and detail-oriented with an entrepreneurial spirit.
            With several years of customer service and management experience, I bring a focus on getting the job done. 
            When I am not coding I am eating good food, spending time with my family, hiking trails, or playing with my dog.
            </div>
        </div>
    );
}