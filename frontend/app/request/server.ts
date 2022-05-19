import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import settings from "../settings";
import {
  AlbumDetailPage,
  AlbumListPage,
  AlbumVideoPage,
  TagListPage,
  TagDetailPage,
} from "../../models";

/**
 * Server side request
 * @returns
 */
export const ServerSafeRequest = () => {
  const config: AxiosRequestConfig = {
    baseURL: settings.INTERNAL_URL,
    headers: {
      "content-type": "application/json",
    },
  };
  const Request = axios.create(config);
  return {
    albums: {
      /**
       * List of Albums
       * @param page
       * @returns
       */
      list: (page: string = "1"): Promise<AxiosResponse<AlbumListPage>> =>
        Request.get(`/vyapp/api/v1/albums/?page=${page}`),
      /**
       * Retrieve an album
       * @param id
       * @param page
       * @returns
       */
      get: (
        id: string,
        page: string = "1"
      ): Promise<AxiosResponse<AlbumDetailPage>> =>
        Request.get(`/vyapp/api/v1/albums/${id}/?page=${page}`),
      /**
       * Retrieve videos of an album
       * @param id
       * @param page
       * @returns
       */
      videos: (
        id: string,
        page: string = "1"
      ): Promise<AxiosResponse<AlbumVideoPage>> =>
        Request.get(`/vyapp/api/v1/albums/${id}/videos/?page=${page}`),
    },
    tags: {
      /**
       * List of tags
       * @returns
       */
      list: (): Promise<AxiosResponse<TagListPage>> =>
        Request.get("/vyapp/api/v1/tags/"),
      /**
       * Retrieve a tag
       * @param slug
       * @param page
       * @returns
       */
      get: (
        slug: string,
        page: string = "1"
      ): Promise<AxiosResponse<TagDetailPage>> =>
        Request.get(encodeURI(`/vyapp/api/v1/tags/${slug}/?page=${page}`)),
    },
  };
};
