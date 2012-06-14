var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );
var utils    = require( 'connect' ).utils;

exports.index = function ( req, res, next ){
  Todo.
    find({ userId : req.cookies.user_id }).
    sort( 'updatedAt', -1 ).
    run( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'index', {
          title : 'Express Todo Example',
          todos : todos
      });
    });
};

exports.create = function ( req, res, next ){
  new Todo({
      userId    : req.cookies.user_id,
      content   : req.body.content,
      updatedAt : Date.now()
  }).save( function ( err, todo, count ){
    if( err ) return next( err );

    res.redirect( '/' );
  });
};

exports.destroy = function ( req, res, next ){
  Todo.findById( req.params.id, function ( err, todo ){
    if( todo.userId !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    todo.remove( function ( err, todo ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};

exports.edit = function( req, res, next ){
  Todo.
    find({ userId : req.cookies.user_id }).
    sort( 'updatedAt', -1 ).
    run( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Express Todo Example',
        todos   : todos,
        current : req.params.id
      });
    });
};

exports.update = function( req, res, next ){
  Todo.findById( req.params.id, function ( err, todo ){
    if( todo.userId !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    todo.content   = req.body.content;
    todo.updatedAt = Date.now();
    todo.save( function ( err, todo, count ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};

exports.current_user = function ( req, res, next ){
  if( !req.cookies.user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};
