import React from 'react';
import { Carousel } from '@mantine/carousel';
import './Styles/JobCategory.css'
import labels from '../../Labels/LandingPageLabel.json'
export default function JobCategory() {
  return (
    <div className="mt-20 pb-5">
      <div className="text-center fw-bold fs-2 p-3">
        {labels.jobCategoryLabels.browse} <span className="text-warning">{labels.jobCategoryLabels.job}</span> {labels.jobCategoryLabels.category}
      </div>
      <div className="text-lg mx-auto text-center w-1/2 fw-semibold">
        {labels.jobCategoryLabels.description}
      </div>
      <Carousel slideSize="%" slideGap="md" style={{ margin: "40px" }} loop>
        {labels.jobCategoryLabels.jobCategoryCards.map((category, index) => (
          <Carousel.Slide key={index} >
            <div className="category-container">
              <div className="icon-container">
                <img
                  style={{ height: '2rem', width: '2rem' }}
                  src={`/Assests/Category/${category.image}`}
                  alt={category.name}
                />
              </div>
              <div className="title">{category.name}</div>
              <div className="description">{category.desc}</div>
              <div className="job-count">{category.jobs}</div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
