import * as actions from "../Actions/actions";
import { baseUrl } from "../shared";
import { errorToast, successToast } from "../utils/toasts";

export const AddContact = (data, push) => (dispatch) => {
  baseUrl
    .post("/contact", data)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        dispatch(actions.add_contact(res.data));
        successToast("Contact Saved!");
        push("/contacts")
      }
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response && err.response.data && err.response.data.message) {
        errorToast(err.response.data.message)
      }
    });
};

export const GetContacts = () => (dispatch) => {
  // dispatch(actions.load_user({ _id: "5f01a5879a24c4022c55759b" }));
  baseUrl
    .get("/contact")
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

export const DeleteContact = (id) => (dispatch) => {
  baseUrl
    .delete(`/contact/${id}`)
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
