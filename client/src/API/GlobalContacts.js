import * as actions from "../Actions/actions";
import { baseUrl } from "../shared";
import { errorToast, successToast } from "../utils/toasts";

export const AddGlobalContact = (data, push) => (dispatch) => {
  baseUrl
    .post("/global/contact", data)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        successToast("Contact Saved!");
        dispatch(actions.add_contact(res.data));
        console.log(res.data);
        push("/contacts")
      }
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      if (err.response && err.response.data && err.response.data.message) {
        errorToast(err.response.data.message)
      }
    });
};

export const GetGlobalContacts = () => (dispatch) => {
  baseUrl
    .get("/global/contact")
    .then((res) => {
      console.log(res);
      if (res.status === 200) {

        dispatch(actions.get_contacts(res.data));
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(actions.auth_error());
    });
};

export const DeleteGlobalContact = (id) => (dispatch) => {
  baseUrl
    .delete(`/global/contact/${id}`)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        successToast("Contact Deleted!");
        dispatch(actions.delete_contact(id));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(actions.logout());
    });
};
