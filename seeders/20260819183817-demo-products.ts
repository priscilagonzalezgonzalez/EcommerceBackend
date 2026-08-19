"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("products", [
      {
        name: "Oak Dining Table",
        image: "https://cdn-images.article.com/products/SKU404/2890x1500/image150364.jpg?fit=max&w=1200", // TODO: image url
        description:
          "Solid oak dining table with a natural finish.",
        price: 499.99,
        active: true,
        stock: 150,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Velvet Sofa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARV_W-RyOcm5Sp3QXdws-cdxkFBepmSmr8dSv9kEpLU-a6xsl94t84qou&s=10", // TODO: image url
        description:
          "Three-seat velvet sofa with deep cushions.",
        price: 899.0,
        active: true,
        stock: 300,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Walnut Nightstand",
        image: "https://www.mimconcept.com/cdn/shop/products/mirah-walnutwood-nightstand.jpg?v=1723686417&width=1445", // TODO: image url
        description:
          "Compact walnut nightstand with a drawer and open shelf.",
        price: 129.0,
        active: true,
        stock: 100,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Oak Bookshelf",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWqxRRGPNhbmJeuJtr5E7xb8kF4znXLojhwca_VKdIzIsSUM5rNvqt1hs&s=10", // TODO: image url
        description:
          "Five-tier oak bookshelf with a sturdy frame.",
        price: 219.99,
        active: true,
        stock: 40,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Marble Coffee Table",
        image: "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202621/0117/marble-topped-pedestal-coffee-table-305-o.jpg", // TODO: image url
        description:
          "Low coffee table with a marble top and black metal base.",
        price: 349.5,
        active: true,
        stock: 220,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Sliding Wardrobe",
        image: "https://files.ekmcdn.com/ronzfurniture/images/savona-white-small-sliding-wardrobe-120cm-2448-p.png", // TODO: image url
        description:
          "Two-door sliding wardrobe with hanging rail and shelves.",
        price: 649.0,
        active: true,
        stock: 130,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Ergonomic Office Chair",
        image: "https://welaxhome.com/cdn/shop/files/s3w_9.webp?v=1776238568&width=2000", // TODO: image url
        description:
          "Adjustable mesh office chair with lumbar support.",
        price: 179.99,
        active: true,
        stock: 18,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Arc Floor Lamp",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9m-xv67pZdUzfOhei-fESBkLNQOwE56Ff_4iQ_vmScDm324blywJGzlA&s=10", // TODO: image url
        description:
          "Overarching floor lamp with a linen shade and marble base.",
        price: 89.99,
        active: true,
        stock: 350,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("products", {
      name: [
        "Oak Dining Table",
        "Velvet Sofa",
        "Walnut Nightstand",
        "Oak Bookshelf",
        "Marble Coffee Table",
        "Sliding Wardrobe",
        "Ergonomic Office Chair",
        "Arc Floor Lamp",
      ],
    });
  },
};
