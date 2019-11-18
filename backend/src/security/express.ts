const dotenv = require("dotenv").config();
const express = require("express");
const auth = require("../authentication").default;
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const db = require("../server");
