/* eslint-env node */
/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
"use strict";
require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const Bundler = require("parcel-bundler");

const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */

const app = express();
const bundler = new Bundler("public/index.html", { cache: false });

// Redirect HTTP to HTTPS,
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

// Logging for each request
app.use((req, resp, next) => {
  const now = new Date();
  const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  const path = `"${req.method} ${req.path}"`;
  const m = `${req.ip} - ${time} - ${path}`;
  // eslint-disable-next-line no-console
  console.log(m);
  next();
});

// Handle requests for the data
// app.get("/forecast/:location", getForecast);
// app.get("/forecast/", getForecast);
// app.get("/forecast", getForecast);

app.use(
  "/forecast",
  createProxyMiddleware({
    target: "https://your-first-pwa.netlify.app",
    changeOrigin: true,
  })
);

// Handle requests for static files
app.use(express.static("public"));
app.use(bundler.middleware());
// Start the server
app.listen(Number(process.env.PORT || 1234));
