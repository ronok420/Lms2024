import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentViewCommonHeader from './header';

const StudentViewCommonLayout = () => {
    return (
        <div>
            <h1>Common layout</h1>
            <StudentViewCommonHeader/>
            <Outlet/>
            
        </div>
    );
};

export default StudentViewCommonLayout;