import request from 'supertest';
import { Application } from '../src/app';
import Express from "express"; 

describe('Authentication Endpoints', () => {
    let app: Express.Express;

    beforeAll(() => {
        const application = new Application();
        app = application.getExpressApp();  // Obtener la instancia de Express
    });

    it('POST /api/auth/register - Debe registrar un usuario', async () => {
        const newUser = {
            nombre: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            rol: 'user'
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('token');  // Asegúrate de que la respuesta incluya un token JWT
        expect(response.body.newUser.email).toEqual(newUser.email);
    });

    it('POST /api/auth/login - Debe autenticar un usuario', async () => {
        const loginData = {
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('token');
    });

    it('POST /api/auth/change-password - Debe cambiar la contraseña del usuario', async () => {
        const loginData = {
            email: 'john.doe@example.com',
            oldPassword: 'password123',
            newPassword: 'newpassword123'
        };

        const response = await request(app)
            .post('/api/auth/change-password')
            .send(loginData)
            .expect(200);

        expect(response.body.message).toEqual('Password updated successfully');
    });

    it('GET /api/auth/verify-email - Debe verificar el correo electrónico del usuario', async () => {
        // Asumimos que este token es válido y está relacionado con un usuario específico
        const token = 'some_valid_token_here';

        const response = await request(app)
            .get(`/api/auth/verify-email?token=${token}`)
            .expect(200);

        expect(response.body.message).toEqual('Email verified successfully');
    });
});
