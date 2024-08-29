import request from 'supertest';
import { Application } from '../src/app';
import Express from "express"; 

describe('Test endpoints', () => {
    let app: Express.Express;

    beforeAll(() => {
        const application = new Application();
        app = application.getExpressApp();  // Obtener la instancia de Express
    });

    it('PUT /api/users/:id - Debe actualizar un usuario', async () => {
        const updateData = {
            nombre: 'Juan Updated',
            email: 'juanupdated@example.com',
            password: 'newpassword123',
            rol: 'admin_updated',
            imagen: 'new_url_de_la_imagen', // opcional
        };
    
        const userId = 1; // Asegúrate de que este ID exista en la base de datos de pruebas
    
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send(updateData)
            .expect('Content-Type', /json/)
            .expect(200);
    
        expect(response.body.email).toEqual(updateData.email);
        expect(response.body.nombre).toEqual(updateData.nombre);
        // Verifica también otros campos actualizados
    });

    it('GET /api/users - Debe obtener todos los usuarios', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200);
    
        expect(response.body).toBeInstanceOf(Array);
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('email');
            expect(response.body[0]).toHaveProperty('nombre');
            // Asegúrate de que otros campos necesarios también estén presentes
        }
    });

    it('GET /api/users - Debe obtener todos los usuarios', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200);
    
        expect(response.body).toBeInstanceOf(Array);
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('email');
            expect(response.body[0]).toHaveProperty('nombre');
            // Asegúrate de que otros campos necesarios también estén presentes
        }
    });

    it('PUT /api/users/:id - Debe actualizar un usuario', async () => {
        const userId = 1; // Este ID debe existir para la prueba, o maneja también el caso de no existencia
        const userData = {
            nombre: 'Juan Updated',
            email: 'juanupdated@example.com'
            // Asegúrate de enviar todos los campos que tu modelo permite actualizar
        };
    
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200);
    
        expect(response.body.nombre).toBe(userData.nombre);
        expect(response.body.email).toBe(userData.email);
        // Verifica otros campos si es necesario
    });
    

    it('DELETE /api/users/:id - Debe eliminar un usuario', async () => {
        const userId = 1; // Asegúrate de que este ID exista
    
        await request(app)
            .delete(`/api/users/${userId}`)
            .expect(204);
    
        // Intenta recuperar el usuario para confirmar que ha sido eliminado
        await request(app)
            .get(`/api/users/${userId}`)
            .expect(404); // Esperamos un 404 Not Found después de eliminar el usuario
    });
    
});
