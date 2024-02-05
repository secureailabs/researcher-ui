import { useEffect } from 'react';
import styles from './Home.module.css';
import { useSelector } from 'react-redux';
import { roleBasedHomeRouting } from '../Login/Login';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state: any) => state.userprofile);

  useEffect(() => {
    const roleRoute = roleBasedHomeRouting(userProfile.roles);
    navigate(roleRoute);
  }, []);

  return <div className={styles.container}>dfd</div>;
};

export default Home;
