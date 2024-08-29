import multer from 'multer';

/**
 * Configuración de almacenamiento de multer en memoria.
 * Los archivos se guardan en la memoria como un buffer, lo que permite su envío directo a S3 u otros servicios.
 */
const storage = multer.memoryStorage(); 

/**
 * Instancia de multer configurada para almacenar archivos en la memoria.
 * Esta instancia se puede usar como middleware en rutas de Express para manejar la carga de archivos.
 * 
 * @example
 * app.post('/upload', upload.single('file'), (req, res) => {
 *   // manejar el archivo cargado en req.file
 * });
 */
const upload = multer({ storage });

export default upload;
