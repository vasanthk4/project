const express = require('express');
const path = require('path');

exports.htmlRouter = () => {
  return express.static(path.join(__dirname, "public"))
}