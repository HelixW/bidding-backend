<!-- PROJECT SHIELDS -->

[![Dependencies][dependencies-shield]][dependencies-url]
[![Issues][issues-shield]][issues-url]
[![Size][size-shield]][size-url]
[![License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/helixw/bidding-backend">
    <img src="https://i.imgur.com/oKMuTpL.png" alt="Logo">
  </a>

  <h3 align="center">Auction Backend</h3>

  <p align="center">
    Server deals with feeding in of round data and all administrative actions and allotment of questions to the respective teams.
    <br />
    <br />
    <a href="https://github.com/HelixW/bidding-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/HelixW/bidding-backend/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The project was created to serve as a base for the auction in ACM-VIT's Reverse Coding event in 2020. The backend deals with serving details of the 3 auction rounds and allotment of questions to the respective teams. Another express server was created to work in conjunction to the current server to deliver real time updates for the auction.

The backend is documented with the help of Swagger and the documentation is available on `/docs`.

### Built With

- [Nest.js][nestjs-url]
- [Firebase][firebase-url]

<!-- GETTING STARTED -->

## Getting Started

The project runs on Node.js utilizing npm as the package manager.

### Prerequisites

Make sure you have node.js version 8 or above to run this project.

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/HelixW/bidding-backend.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file using the configuration in `.env.example`
   ```sh
   touch .env
   ```
4. Start the development server
   ```sh
   npm run start:dev
   ```

<!-- USAGE -->

## Usage

Documentation for the restful server is available at `http://localhost:<your-port>/docs`.

The server uses a global `/api` prefix for all routes.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Shreyas K. - [Linkedin][personal-linkedin-url] - <a href="mailto:shreyas.2000@hotmail.com">Business Email</a>

Project Link - [https://github.com/HelixW/bidding-backend][project-url]

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Google Cloud Platform][gcp-url]
- [Swagger][swagger-url]
- [Joi][joi-url]
- [JSONWebToken][jwt-url]

<!-- LINKS & IMAGES -->

[dependencies-shield]: https://img.shields.io/david/helixw/bidding-backend?style=for-the-badge
[dependencies-url]: https://github.com/HelixW/bidding-backend/blob/master/package.json
[issues-shield]: https://img.shields.io/github/issues-raw/helixw/bidding-backend?style=for-the-badge
[issues-url]: https://github.com/HelixW/bidding-backend/issues
[size-shield]: https://img.shields.io/github/repo-size/helixw/bidding-backend?style=for-the-badge
[size-url]: https://github.com/helixw/bidding-backend
[license-shield]: https://img.shields.io/github/license/helixw/bidding-backend?style=for-the-badge
[license-url]: https://github.com/HelixW/bidding-backend/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/Linkedin-View_Profile-blue?style=for-the-badge&logo=linkedin
[linkedin-url]: https://www.linkedin.com/in/shreyas-k-0aa77018b
[nestjs-url]: https://nestjs.com/
[firebase-url]: https://firebase.google.com/
[personal-linkedin-url]: https://www.linkedin.com/in/shreyas-k-0aa77018b
[project-url]: https://github.com/HelixW/bidding-backend
[gcp-url]: https://cloud.google.com
[swagger-url]: https://swagger.io/
[joi-url]: https://joi.dev/
[jwt-url]: https://jwt.io/
