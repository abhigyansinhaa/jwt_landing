"use client";

import React, { useEffect } from "react";
import FlipCard from "./flipCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

export default function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCard = carousel.querySelector(".card");
    const arrowBtns = document.querySelectorAll(".wrapper i");

    const firstCardWidth = firstCard.offsetWidth;
    const carouselChildren = [...carousel.children];
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    let isDragging = false,
      isAutoPlay = true,
      startX,
      startScrollLeft,
      timeoutId;

    // Helper function for infinite scroll
    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      } else if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }
    };

    // Insert copies of the first/last few cards for infinite scrolling
    carouselChildren.slice(-cardPerView).reverse().forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    carouselChildren.slice(0, cardPerView).forEach((card) => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll to the correct position to hide the duplicate cards
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Dragging functionality
    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX || e.touches?.[0].pageX;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      const pageX = e.pageX || e.touches?.[0].pageX;
      carousel.scrollLeft = startScrollLeft - (pageX - startX);
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 3000);
    };

    // Arrow button click event
    arrowBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
      });
    });

    // Event listeners for drag and autoplay functionality
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    document.addEventListener("touchend", dragStop);

    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Cleanup event listeners on unmount
    return () => {
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
      carousel.removeEventListener("touchstart", dragStart);
      carousel.removeEventListener("touchmove", dragging);
      document.removeEventListener("touchend", dragStop);
      carousel.removeEventListener("scroll", infiniteScroll);
      wrapper.removeEventListener("mouseenter", () => clearTimeout(timeoutId));
      wrapper.removeEventListener("mouseleave", autoPlay);
    };
  }, []);

  const cards = [
    { id: "1", variant: "hover" },
    { id: "2", variant: "hover" },
    { id: "3", variant: "hover" },
    { id: "4", variant: "hover" },
    { id: "5", variant: "hover" },
    { id: "6", variant: "hover" },
  ];

  return (
    <>
      <div>
        <video
          src="https://stsci-opo.org/STScI-01J4M80RCME4DP0R50MGW5MK5V.mp4"autoPlay loop className="z-10 absolute min-w-full min-h-full"
        />
        <div className="z-20">
          <span className="z-20 relative text-5xl top-64 left-96 font-extrabold text-white">
            WEBB SPACE TELESCOPE
          </span>
          <a href="#link">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-white focus:ring-4 z-20 top-96">
              <span className="relative px-5 py-2.5 bg-white rounded-md">Image Gallery</span>
            </button>
          </a>
        </div>
      </div>

      <div className="container">
        <a id="link"></a>
        <div className="row h-100">
          <div className="col d-flex flex-column flex-md-row justify-content-around align-items-center">
            <div className="wrapper">
              <i id="left" className="fa-solid fas fa-angle-left">&lt;</i>
              <ul className="carousel">
                {cards.map((card) => (
                  <li className="card" key={card.id}>
                    <FlipCard card={card} />
                  </li>
                ))}
              </ul>
              <i id="right" className="fa-solid fas fa-angle-right">&gt;</i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}