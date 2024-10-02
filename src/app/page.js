"use client";

import React, { useEffect } from "react";
import FlipCard from "./flipCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

export default function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run the carousel code on the client side
      function carousel() {
        const carousel = document.querySelector(".carousel");
        const arrowBtns = document.querySelectorAll(".wrapper i");
        const wrapper = document.querySelector(".wrapper");

        if (!carousel || !arrowBtns.length || !wrapper) return;

        const firstCard = carousel.querySelector(".card");
        const firstCardWidth = firstCard.offsetWidth;

        let isDragging = false,
          startX,
          startScrollLeft,
          timeoutId;

        const dragStart = (e) => {
          isDragging = true;
          carousel.classList.add("dragging");
          startX = e.pageX || e.touches[0].pageX;
          startScrollLeft = carousel.scrollLeft;
        };

        const dragging = (e) => {
          if (!isDragging) return;

          const pageX = e.pageX || e.touches[0].pageX;
          const newScrollLeft = startScrollLeft - (pageX - startX);

          if (newScrollLeft <= 0 || newScrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
            isDragging = false;
            return;
          }

          carousel.scrollLeft = newScrollLeft;
        };

        const dragStop = () => {
          isDragging = false;
          carousel.classList.remove("dragging");
        };

        const autoPlay = () => {
          if (window.innerWidth < 800) return;

          const totalCardWidth = carousel.scrollWidth;
          const maxScrollLeft = totalCardWidth - carousel.offsetWidth;

          if (carousel.scrollLeft >= maxScrollLeft) return;

          timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 5000);
        };

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);

        carousel.addEventListener("touchstart", dragStart);
        carousel.addEventListener("touchmove", dragging);
        document.addEventListener("touchend", dragStop);

        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        wrapper.addEventListener("mouseleave", autoPlay);

        arrowBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
          });
        });
      }

      // Call the carousel function
      carousel();
    }
  }, []);

  const cards = [
    { id: "1", variant: "hover"},
    { id: "2", variant: "hover"},
    { id: "3", variant: "hover"},
    { id: "4", variant: "hover"},
    { id: "5", variant: "hover"},
    { id: "6", variant: "hover"},
  ];

  return (
    <div className="container">
      <div className="row h-100">
        <div className="col d-flex flex-column flex-md-row justify-content-around align-items-center">
          <div className="wrapper">
            <i id="left" className="fa-solid fas fa-angle-left"></i>
            <ul className="carousel">
              {cards.map((card) => (
                <li className="card" key={card.id}>
                  <FlipCard card={card} />
                </li>
              ))}
            </ul>
            <i id="right" className="fa-solid fas fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
