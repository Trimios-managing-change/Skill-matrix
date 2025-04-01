import React, { useState } from 'react'

function AboutContext() {
  const [text, setText] = useState('The Job Feature in Trimios provides users with verified job opportunities tailored to their skills and experience. Users can track their job applications, receive real-time updates, and filter jobs based on skill requirements. This ensures a secure and efficient job search experience with reliable career opportunities. ');
    const [title, setTitle] = useState('Jobs');
    const buttons = [
        { title: 'Jobs', description: 'The Job Feature in Trimios provides users with verified job opportunities tailored to their skills and experience. Users can track their job applications, receive real-time updates, and filter jobs based on skill requirements. This ensures a secure and efficient job search experience with reliable career opportunities.' },
        { title: 'Skill Matrix', description: 'The Skill Matrix in Trimios helps users analyze their skills by mapping strengths, weaknesses, and industry demand. It provides personalized insights, skill gap analysis, and course recommendations to enhance career growth. Users can track progress and stay competitive with real-time updates.' },
        { title: 'Verification', description: 'The Verification Feature in Trimios ensures that users, organizations, and job postings are authenticated for credibility. Employees and students are verified by managers or admins, ensuring a trustworthy ecosystem for job applications and skill assessments.' },
        { title: 'Skill Market', description: 'The Skill Market analyzes trending job skills based on real-time postings from platforms like LinkedIn and Naukri. Users get insights on in-demand skills and recommendations to stay ahead in the job market with relevant learning resources.' },
        { title: 'Achieve', description: 'The Achievements Feature tracks and showcases certifications, completed courses, and verified skills to enhance user profiles. It helps users build credibility and stand out to recruiters by highlighting their professional milestones.' }
    ];

    return (
        <div className='landingpagebtns'>
            <div className='context-btns'>
                {buttons.map((button, index) => (
                    <button key={index} onClick={() => { setText(button.description); setTitle(button.title); }}>
                        {button.title}
                    </button>
                ))}
            </div>
            <br />
            <hr />
            <h1 id='btntittle'>{title}</h1>
            
            <p id='btntext'>{text}</p>
        </div>
    )
}


export default AboutContext
