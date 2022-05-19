import styles from "../../../styles/album_action.module.css";
import { useRef, useState } from "react";
import { AuthRequest } from "../../../app/request";
import { TResponse, Tag } from "../../../models";
import { useSession } from "next-auth/react";
import { TextInput } from "./TextInput";
import { PictureInput } from "./PictureInput";
import { CheckBoxGroupInput } from "./CheckBoxGroupInput";
import { validate_form } from "./utils";

export const AlbumCreationForm = ({ tags }: { tags: Array<Tag> }) => {
  const { data: session } = useSession();
  const [album_name, set_album_name] = useState("");
  const [checkbox_tags, set_checkbox_tags] = useState<string[]>([]);
  const [album_tags, set_album_tags] = useState("");
  const [album_cover, set_album_cover] = useState<File>();
  const [album_pictures, set_album_pictures] = useState<Array<File>>();

  const [input_cover_value, set_input_cover_value] = useState<string>("");
  const [input_pictures_value, set_input_pictures_value] = useState<string>("");

  const [is_sending, set_is_sending] = useState<boolean>(false);
  const button_ref = useRef<HTMLButtonElement>(null);

  const [creation_response, set_creation_response] = useState<TResponse>();

  const [check_states, set_check_states] = useState<boolean[]>(
    new Array(tags.length).fill(false)
  );

  const clear_input = () => {
    set_album_name("");
    set_album_tags("");
    set_album_cover(undefined);
    set_album_pictures(undefined);
    set_input_cover_value("");
    set_input_pictures_value("");

    set_checkbox_tags([]);
    set_check_states(check_states.fill(false));
  };

  async function perform_action() {
    const data = {
      name: album_name,
      tags: [album_tags, checkbox_tags.join(";")].join(";"),
      cover: album_cover,
      pictures: album_pictures,
    };
    clear_input();

    set_is_sending(true);
    button_ref.current?.setAttribute("disabled", "disabled");

    const validate = await validate_form(data);
    if (validate) {
      try {
        let access_token = "";
        if (session) {
          access_token = session.access_token as string;
        }
        const res = await AuthRequest(access_token).albums.create(data);
        set_creation_response(res.data);
      } catch (err) {
        set_creation_response({
          error: true,
          message:
            "Something went wrong. Or not authenticated. Please try again!",
        });
      }
    } else {
      set_creation_response({
        error: true,
        message: "Missing required fields",
      });
    }
    set_is_sending(false);

    setTimeout(() => {
      button_ref.current?.removeAttribute("disabled");
      set_creation_response(undefined);
    }, 3000);
  }

  return (
    <div className="container">
      <h4 className="mx-auto">Album Creator</h4>
      <form>
        <div className="mb-3 mt-3">
          <TextInput
            label="Album name:"
            name="album"
            placeholder="album name"
            state_set={{ state: album_name, dispatch: set_album_name }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags:
          </label>
          <CheckBoxGroupInput
            value_state_set={{
              states: checkbox_tags,
              dispatch: set_checkbox_tags,
            }}
            check_state_set={{
              states: check_states,
              dispatch: set_check_states,
            }}
            tags={tags}
          />
        </div>
        <div className="mb-3">
          <TextInput
            label="Custom tags:"
            name="custom_tag"
            placeholder="tag1;tag2"
            state_set={{ state: album_tags, dispatch: set_album_tags }}
          />
        </div>
        <div className="mb-3">
          <PictureInput
            label="Cover"
            name="cover"
            text_state_set={{
              state: input_cover_value,
              dispatch: set_input_cover_value,
            }}
            file_dispatcher={{ multiple: false, dispatch: set_album_cover }}
          />
        </div>
        <div className="mb-3">
          <PictureInput
            label="Pictures"
            name="picture"
            text_state_set={{
              state: input_pictures_value,
              dispatch: set_input_pictures_value,
            }}
            file_dispatcher={{ multiple: true, dispatch: set_album_pictures }}
          />
        </div>
        <button
          type="button"
          ref={button_ref}
          className="btn btn-primary"
          onClick={perform_action}
        >
          {is_sending ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Please Wait
            </>
          ) : (
            "Submit"
          )}
        </button>
        {creation_response === undefined ? (
          <></>
        ) : creation_response.error ? (
          <p className={`${styles["error"]}`}>{creation_response.message}</p>
        ) : (
          <p className={`${styles["succeed"]}`}>{creation_response.message}</p>
        )}
      </form>
    </div>
  );
};
