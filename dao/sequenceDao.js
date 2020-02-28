const {baseModelDao} = require('./baseModalDao');

class SequenceDao extends baseModelDao {
    constructor() {
        super('sequences', 'sequence_id');
        this.baseModal = 'sequences';
        this.primaryKey = 'sequence_id';
    }

    saveSequences(req, res, next) {

        console.log('req.body', req.body)

        var sequenceParent= req.body.parentSequence;
        var subSequences= req.body.subsequences;

        var _this= this;
        _this.db['sequences'].build(sequenceParent).save().then(result1 => {


            subSequences.forEach(function(subSequence) {
                subSequence.parent_sequence = result1.sequence_id
                _this.db['sequences'].build(subSequence).save().then(result1 => {

                })
            })

            _this.db['sequences'].findOne({
                where: {
                    sequence_id: result1.sequence_id
                },
                include: [
                    {
                        model: _this.db['operation_templates']
                    }
                ]
            }).then(sequence => {


                res.send({
                    success: true,
                    data: sequence
                });

            })

        })

    }

    deleteSequences(req,res,next) {
        var sequence_id = req.params.sequence_id;
        var _this= this;

        _this.db['sequences'].update({
            active: 'N'
        } , {
            where : {
                parent_sequence: sequence_id
            }
        }).then(result => {

            _this.db['sequences'].update({
                active: 'N'
            } , {
                where : {
                    sequence_id: sequence_id
                }
            })
        });

        res.send({
            success: true
        })
    }


    updateSequences(req,res,next) {

        var sequenceParent= req.body.parentSequence;
        var subSequences= req.body.subsequences;

        var _this = this;

        _this.db['sequences'].update(sequenceParent, {where: {sequence_id: sequenceParent.sequence_id}}).then(result => {

            if ( result[0] === 1 ) {

                subSequences.forEach(function(newSubSequence) {


                    let v = false;

                    if (newSubSequence.sequence_id === '' || newSubSequence.sequence_id === undefined) {
                        _this.db['sequences'].build(newSubSequence).save().then(result1 => {

                        })
                    }

                    else {
                        _this.db['sequences'].update(newSubSequence, {where: {sequence_id: newSubSequence.sequence_id}}).then(result => {

                        })

                    }

                })

                _this.db['sequences'].findAll({
                    where : {
                        parent_sequence: sequenceParent.sequence_id
                    }
                }).then(oldSubSequences =>  {

                    oldSubSequences.forEach(function(oldSubSequence) {

                        let v = false;

                        subSequences.forEach(function(newSubSequence) {
                            if (oldSubSequence.sequence_id === newSubSequence.sequence_id) {
                                v= true;
                            }
                        })

                        if (v=== false) {
                            // delete
                            _this.db['sequences'].update({active: 'N'}, {where: {sequence_id: oldSubSequence.sequence_id}}).then(result => {
                            })
                        }
                    })
                })

                res.send({
                    success: true,
                    data: {
                        parentSequence: sequenceParent,
                        subSequences: subSequences
                    }
                })
            } else {
                res.send({
                    success: false,
                    data: null
                })
            }
        });


    }

}

module.exports = SequenceDao;
