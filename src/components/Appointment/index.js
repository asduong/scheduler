
import React, { useEffect } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';


function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  }

  

  function deleteItem() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true);
        console.log(err);
      });
  }

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, mode, transition]);

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {(mode === SHOW && props.interview) && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={(name, interviewer) => {
          if (name && interviewer) {
            transition(SAVING, true);
            props
              .bookInterview(props.id, save(name, interviewer), props.day)
              .then(() => transition(SHOW));
          } else {
            transition(ERROR_SAVE, true);

          }
        }}
      />
      )}
      {mode === SAVING && (
        <Status message={'Saving'}/>
      )}
      {mode === DELETING && (
        <Status message={'Deleting'} />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message={'Delete the appointment?'}
          onCancel={() => back()}
          onConfirm={() => deleteItem()}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          value={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={(name, interviewer) => {
            if (name && interviewer) {
              transition(SAVING, true);
              props.bookInterview(props.id, save(name, interviewer), props.day)
                .then(() => transition(SHOW))
            } else {
              transition(ERROR_SAVE, true);
              ;
            }
          }}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message={'Something went wrong when saving the interview! Please try again.'}
          onClose={() => back()} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message={'Something went wrong when deleting the interview! Please try again.'}
          onClose={() => back()} 
        />
      )}
    </article>
  );
}

export default Appointment