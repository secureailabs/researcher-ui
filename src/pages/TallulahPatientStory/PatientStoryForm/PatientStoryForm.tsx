import styles from './PatientStoryForm.module.css';

export interface IPatientStoryForm {
  sampleTextProp: string;
}

const PatientStoryForm: React.FC<IPatientStoryForm> = ({ sampleTextProp }) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default PatientStoryForm;
