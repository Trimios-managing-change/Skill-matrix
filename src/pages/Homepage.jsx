

import React from 'react';
import HomepageStudent from '../components/HomepageStudent';
import HomepageEmployee from '../components/HomepageEmployee';
import HomepageOrganisation from '../components/HomepageOrganisation';
import HomepageHr from '../components/HomepageHr';

function Homepage() {
  const role = localStorage.getItem('role');

  return (
    <div>
      {role === 'STUDENT' && <HomepageStudent/>}
      {role === 'EMPLOYEE' && <HomepageEmployee />}
      {role === 'ORGANIZATION' && <HomepageOrganisation />}
      {role === 'HR' && <HomepageHr />}
      {role === null && <div>Please log in</div>}
    
    </div>
  );
}

export default Homepage;

