import { Router } from 'express'
const router = Router()

// importing the books routes controller
import booksCtrl from '../controllers/booksCtrl';


router.get('/view', booksCtrl.getBooks);

router.get('/view/:id', booksCtrl.getOneBook)

router.get('/add', booksCtrl.formRender)
router.post('/add', booksCtrl.createBook)

router.post('/like/:id', booksCtrl.addLike)
router.post('/dislike/:id', booksCtrl.addDislike)

router.delete('/:id', booksCtrl.deleteBook)

export default router