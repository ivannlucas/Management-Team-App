import { Router } from "express";

const router: Router = Router();

/**
 * Ruta principal de la aplicación que renderiza la página de inicio.
 * 
 * @route GET /
 * @param {Request} req - El objeto de solicitud HTTP.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @param {NextFunction} next - La función de middleware para pasar el control al siguiente middleware.
 */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

export default router;