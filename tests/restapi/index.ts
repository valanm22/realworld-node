/**
 * This file is used to create a global instance of Supertest to be used in all
 * REST API tests.
 */
import request from "supertest";
import app from "@src/app";

export const api = request(app);