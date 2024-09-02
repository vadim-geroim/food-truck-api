const request = require('supertest');
const express = require('express');
const {app, server} = require('../index');

describe('Food Truck API', () => {
  // Test for GET /food-trucks
  describe('GET /food-trucks', () => {
    it('should return a list of all food trucks (happy path)', async () => {
      const response = await request(app).get('/food-trucks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should handle non-existing route gracefully (invalid data)', async () => {
      const response = await request(app).get('/non-existing-route');
      expect(response.status).toBe(404);
    });
  });

  // Test for GET /food-trucks/:locationid
  describe('GET /food-trucks/:locationid', () => {
    it('should return the food truck with the specified locationid (happy path)', async () => {
      const response = await request(app).get('/food-trucks/1569152');
      expect(response.status).toBe(200);
      expect(response.body.locationid).toBe(1569152);
    });

    it('should return a 400 error for invalid locationid (invalid data)', async () => {
      const response = await request(app).get('/food-trucks/invalid');
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('Location ID must be an integer');
    });
  });

  // Test for POST /food-trucks
  describe('POST /food-trucks', () => {
    it('should add a new food truck (happy path)', async () => {
      const newTruck = {
        locationid: 9999999,
        Applicant: "Test Food Truck",
        FacilityType: "Truck",
      };

      const response = await request(app)
        .post('/food-trucks')
        .send(newTruck)
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body.locationid).toBe(9999999);
    });

    it('should return a 400 error for missing required fields (invalid data)', async () => {
      const response = await request(app)
        .post('/food-trucks')
        .send({}) // Missing required fields
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });
  });

  // Test for PUT /food-trucks/:locationid
  describe('PUT /food-trucks/:locationid', () => {
    it('should update an existing food truck (happy path)', async () => {
      const response = await request(app)
        .put('/food-trucks/1569152')
        .send({ Applicant: "Updated Food Truck" })
        .set('Accept', 'application/json');
      expect(response.status).toBe(200);
      expect(response.body.Applicant).toBe("Updated Food Truck");
    });

    it('should return a 400 error for invalid locationid (invalid data)', async () => {
      const response = await request(app)
        .put('/food-trucks/invalid')
        .send({ Applicant: "Updated Food Truck" })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('Location ID must be an integer');
    });
  });

  // Test for DELETE /food-trucks/:locationid
  describe('DELETE /food-trucks/:locationid', () => {
    it('should delete a food truck (happy path)', async () => {
      const response = await request(app).delete('/food-trucks/1569152');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Food truck with locationid 1569152 has been deleted');
    });

    it('should return a 400 error for invalid locationid (invalid data)', async () => {
      const response = await request(app).delete('/food-trucks/invalid');
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('Location ID must be an integer');
    });
  });
  afterAll((done) => {
    server.close(done);
  });
});
