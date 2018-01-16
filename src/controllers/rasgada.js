import mqtt from 'mqtt';

import {
    Rasgada,
    PAGINATION_LIMIT
} from '../models/rasgada';

import {
    EXCEPTION
} from '../constants';
import {
    ExceptionFactory
} from '../util';
import {
    setTimeout
} from 'timers';

export default class RasgadaController {

    static list(req, res, next) {
        try {
            let page = req.query.p || 1;
            let filter = Rasgada.asSearch(req.query.q, ['nome', 'cidade', 'referencia', 'comentario']);
            Rasgada
                .paginate(filter, {
                    page,
                    limit: PAGINATION_LIMIT,
                    sort: {
                        horario: -1
                    }
                })
                .then(rasgadas => {
                    let nextPage = rasgadas.docs.length < rasgadas.limit ? Number(rasgadas.page) : ++rasgadas.page;
                    res.json({
                        rasgadas: rasgadas.docs,
                        nextPage,
                        total: rasgadas.total
                    });
                })
                .catch(next);
        } catch (e) {
            next(e);
        }
    }

    static get(req, res, next) {
        try {
            Rasgada
                .findById(req.params.id)
                .exec()
                .then(rasgada => res.json(rasgada))
                .catch(next);
        } catch (e) {
            next(e);
        }
    }

    static post(req, res, next) {
        try {
            let rasgada = new Rasgada(req.body);
            rasgada.save()
                .then(rasgada => {
                    let client = mqtt.connect('mqtt://aws.canionlabs.io');
                    client.on('connect', function () {
                        try {
                            client.subscribe('canionlabs/led')
                            client.publish('canionlabs/led', 'blue');
                            setTimeout(() => {
                                client.publish('canionlabs/led', 'none');
                            }, 500);
                        } catch (error) {
                            console.log(error)
                        }
                    })
                    res.json(rasgada)
                })
                .catch(next);
        } catch (e) {
            next(e);
        }
    }

    static put(req, res, next) {
        try {
            let id = req.params.id;
            let updatedRasgada = req.body;
            Rasgada
                .findById(id)
                .exec()
                .then(rasgada => {
                    return Rasgada.update({
                        _id: id
                    }, updatedRasgada, {
                        new: true
                    });
                })
                .then(rasgada => res.json(rasgada))
                .catch(next)
        } catch (e) {
            next(e);
        }
    }
    static voteUp(req, res, next) {
        try {
            let id = req.params.id;
            let updatedRasgada = req.body;

            Rasgada
                .findById(id)
                .exec()
                .then(rasgada => {
                    return Rasgada.update({
                        _id: id
                    }, {
                        $inc: {
                            votosPositivos: 1
                        }
                    }, {
                        new: true
                    });
                })
                .then(rasgada => {

                    let client = mqtt.connect('mqtt://aws.canionlabs.io');
                    client.on('connect', function () {
                        try {
                            client.subscribe('canionlabs/led')
                            client.publish('canionlabs/led', 'green');
                            setTimeout(() => {
                                client.publish('canionlabs/led', 'none');
                            }, 500);
                        } catch (error) {
                            console.log(error)
                        }
                    })

                    res.json(rasgada)
                })
                .catch(next)
        } catch (e) {
            next(e);
        }
    }
    static voteDown(req, res, next) {
        try {
            let id = req.params.id;
            let updatedRasgada = req.body;
            Rasgada
                .findById(id)
                .exec()
                .then(rasgada => {
                    return Rasgada.update({
                        _id: id
                    }, {
                        $inc: {
                            votosNegativos: 1
                        }
                    }, {
                        new: true
                    });
                })
                .then(rasgada => {
                    let client = mqtt.connect('mqtt://aws.canionlabs.io');
                    client.on('connect', function () {
                        try {
                            client.subscribe('canionlabs/led')
                            client.publish('canionlabs/led', 'red');
                            setTimeout(() => {
                                client.publish('canionlabs/led', 'none');
                            }, 500);
                        } catch (error) {
                            console.log(error)
                        }
                    })
                    res.json(rasgada)
                })
                .catch(next)
        } catch (e) {
            next(e);
        }
    }

    static delete(req, res, next) {
        try {
            let id = req.params.id;
            Rasgada
                .findById(id)
                .exec()
                .then(rasgada => {
                    return Rasgada.update({
                        _id: id
                    }, {
                        activated: false
                    }, {
                        new: true
                    });
                })
                .then(() => res.sendStatus(200))
                .catch(next)
        } catch (e) {
            next(e);
        }
    }
}