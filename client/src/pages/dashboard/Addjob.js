import { Formin, Alert, FormRowSelect } from '../../component/index';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
const AddJob = () => {
  document.title ='JOBIFY-Add Job'
  const {
    isEditing,
    showAlert,
    // user,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
  } = useAppContext();

const[form,setForm]=useState({
  position:position,
  company:company,
  jobLocation:jobLocation,
  status:status,
  jobType:jobType,

});

   

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.position || !form.company || !form.jobLocation) {
      displayAlert();
      return;
    }
    console.log(form);
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}:${value}`);
    setForm({...form,[name]:value});
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4 className='form-title'>{isEditing ? 'edit job' : 'add job'} </h4>
        {showAlert && <Alert />}

        {/* position */}
        <div className='form-center'>
          <Formin
            type='text'
            name='position'
            value={form.position}
            onChange={handleJobInput}
          />
          {/* company */}
          <Formin
            type='text'
            name='company'
            value={form.company}
            onChange={handleJobInput}
          />
          {/* location */}
          <Formin
            type='text'
            name='jobLocation'
            value={form.jobLocation}
            onChange={handleJobInput}
          />
          {/* job status */}

          <FormRowSelect

            name={'status'}
            value={form.status}
            handleChange={handleJobInput}
            list={statusOptions}

          />


          {/* job type */}

          <FormRowSelect
            name={'jobType'}
            value={form.jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions} />
          







          <button
            className='btn btn-block form-btn'
            type='submit'
            onClick={handleSubmit}
          >
            submit
          </button>

        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;





