import React from "react";

const AllPlants = () => {
  return (
    <>
      <div class="list-container">
        <li>
          <h2>plant name here</h2>
          <a href="linkToThatPlant">
            <img
              id="pl1"
              src="https://www.hill-interiors.com/images/giant/20132.jpg"
              alt="plant"
            />
          </a>
          <p>some description of plant</p>
          <p>price of plant here</p>
        </li>
      </div>
    </>
  );
};

export default AllPlants;
