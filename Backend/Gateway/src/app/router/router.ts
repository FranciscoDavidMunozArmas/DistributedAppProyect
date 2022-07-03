import { Router } from 'express';
import CommentaryServiceRouter from '../services/commentary.router';
import FullRecipeServiceRouter from '../services/fullRecipe.router';
import UserServiceRouter from '../services/user.router';
import ScoreServiceRouter from '../services/score.router';
import TopServiceRouter from '../services/top.router';
import RecipeServiceRouter from '../services/recipe.router';


const router = Router();

router.use((req, res, next) => {
    next();
});

router.use('/commentaries', CommentaryServiceRouter);
router.use('/full/recipes', FullRecipeServiceRouter);
router.use('/users', UserServiceRouter);
router.use('/scores', ScoreServiceRouter);
router.use('/top', TopServiceRouter);
router.use('/recipes', RecipeServiceRouter);

export default router;
