import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import settings from "../settings";
import { TResponse, AlbumListPage, Album, TAFormValue } from "../../models";

type TSide = "client" | "server";

const get_base_url = (side: TSide) => {
  switch (side) {
    case "client":
      return settings.PUBLIC_URL;
    case "server":
      return settings.INTERNAL_URL;
    default:
      return settings.PUBLIC_URL;
  }
};

/**
 * Make request for authenticated user
 * @param access_token access token of user
 * @param side: `client` | `server`, default: `client`
 */
export const AuthRequest = (access_token: string, side: TSide = "client") => {
  const config: AxiosRequestConfig = {
    baseURL: get_base_url(side),
    headers: { Authorization: `Bearer ${access_token}` },
  };
  const Request = axios.create(config);
  return {
    albums: {
      /**
       * Retrieve list of albums
       * @param page
       * @returns `AlbumListPage`
       */
      list: (page: string = "1"): Promise<AxiosResponse<AlbumListPage>> => {
        return Request.get(`/vyapp/api/v1/action/albums/?page=${page}`);
      },
      /**
       * Retrieve an album
       * @param album_id id
       * @returns `Album`
       */
      get: (album_id: number): Promise<AxiosResponse<Album>> => {
        return Request.get(`/vyapp/api/v1/action/albums/${album_id}`);
      },
      /**
       * Create an album
       * @param data FormData
       * @returns
       */
      create: (data: TAFormValue): Promise<AxiosResponse<TResponse>> => {
        const form_data = new FormData();
        if (data.cover) {
          form_data.append("cover", data.cover, data.cover.name);
        }
        if (data.pictures) {
          data.pictures.forEach((f) => {
            form_data.append("pictures", f, f.name);
          });
        }
        form_data.append("name", data.name);
        form_data.append("tags", data.tags);
        Request.interceptors.request.use(function (config: AxiosRequestConfig) {
          if (config.headers)
            config.headers.contentType = "multipart/form-data";
          return config;
        });
        return Request.post("/vyapp/api/v1/action/albums/", form_data);
      },
      /**
       * Update an album
       * @param album_id
       * @param data
       * @returns
       */
      update: (
        album_id: number,
        data: TAFormValue
      ): Promise<AxiosResponse<TResponse>> => {
        const form_data = new FormData();
        // ... TODO:
        return Request.put(
          `/vyapp/api/v1/action/albums/${album_id}`,
          form_data
        );
      },
      /**
       * Delete an album
       * @param album_id
       * @returns
       */
      delete: (album_id: number): Promise<AxiosResponse<TResponse>> => {
        return Request.delete(`/vyapp/api/v1/action/albums/${album_id}`);
      },
    },
  };
};
