// Valide que le champ name est présent et non vide dans le corps de la requête
const validateRequestBodyName = (req) => {
    return (
        req.body &&
        req.body.name &&
        typeof req.body.name === 'string' &&
        req.body.name.trim() !== ''
    );
};

// Valide une requête POST pour ajouter une ville
const validateRequestCreateCity = (req, res) => {
    if (!validateRequestBodyName(req)) {
        res.status(400).json({ error: 'Le champ "name" est requis et doit être une chaîne non vide.' });
        return false;
    }
    return true;
};

// Valide une requête PUT pour mettre à jour une ville
const validateRequestUpdateCity = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'Le paramètre "id" est requis dans l’URL.' });
        return false;
    }

    if (!validateRequestBodyName(req)) {
        res.status(400).json({ error: 'Le champ "name" est requis et doit être une chaîne non vide.' });
        return false;
    }

    return true;
};

// Valide une requête DELETE pour supprimer une ville
const validateRequestDeleteCity = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'Le paramètre "id" est requis dans l’URL.' });
        return false;
    }
    return true;
};

module.exports = {
    validateRequestCreateCity,
    validateRequestUpdateCity,
    validateRequestDeleteCity,
};
