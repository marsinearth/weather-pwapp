# Your First Progressive Web App Codelab

> 이 레포는 [구글의 CodeLab PWA강좌](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0)용 레포입니다.
> 원래 쓰이던 [Dark Sky Api](https://darksky.net/dev)가 Apple에 합류하게 되면서 회원가입을 받지 않아,
> 비슷한 구조의 무료인 [Open Weather Map](https://openweathermap.org/) 의 [One Call Api](https://openweathermap.org/api/one-call-api)로 변경한 버전입니다. (관련 아이콘들도 다 변경하였습니다.)

### [Demo에서 확인](https://open-weather-map-pwa.netlify.app/)

These are the resource files needed for the
[Your First Progressive Web App][codelab] codelab.

In this codelab, you'll build a weather web app using Progressive Web App
techniques. Your app will:

- Use responsive design, so it works on desktop or mobile.
- Be fast & reliable, using a service worker to precache the app resources
  (HTML, CSS, JavaScript, images) needed to run, and cache the weather data
  at runtime to improve performance.
- Be installable, using a web app manifest and the `beforeinstallprompt` event
  to notify the user it's installable.

## What you'll learn

- How to create and add a web app manifest
- How to provide a simple offline experience
- How to provide a full offline experience
- How to make your app installable

## Getting started

To get started, check out the [codelab instruction][codelab]

## Feedback

This is a work in progress, if you find a mistake, please [file an issue][git-issue].

## License

Copyright 2019 Google, Inc.

Licensed to the Apache Software Foundation (ASF) under one or more contributor
license agreements. See the NOTICE file distributed with this work for
additional information regarding copyright ownership. The ASF licenses this
file to you under the Apache License, Version 2.0 (the “License”); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

[codelab]: https://codelabs.developers.google.com/codelabs/your-first-pwapp/
[git-issue]: https://github.com/googlecodelabs/your-first-pwapp/issues
