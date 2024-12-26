import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentViewCommonLayout = () => {
    return (
        <div>
            <h1>Common layout</h1>
            <Outlet/>
            
        </div>
    );
};

export default StudentViewCommonLayout;