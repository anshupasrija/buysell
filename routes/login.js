
app.get('/login/:id', (req, res) => {

  req.session.user_id = req.params.id;
  res.cookie('user_id', req.params.id);
  res.redirect('/');

});


