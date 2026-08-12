const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/benefits', function (req, res) {
  res.render('benefits')
})

router.post('/benefits', function (req, res) {
  const answer = req.session.data['benefits']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'benefits': 'Select yes if you get a qualifying benefit.' }
    return res.render('benefits')
  }
  if (answer === 'yes') {
    return res.redirect('/universal-credit-income')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-benefits')
  }
  res.redirect('/universal-credit-income')
})

router.get('/ineligible-benefits', function (req, res) {
  res.render('ineligible-benefits')
})

router.get('/universal-credit-income', function (req, res) {
  res.render('universal-credit-income')
})

router.post('/universal-credit-income', function (req, res) {
  const answer = req.session.data['universal-credit-income']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'universal-credit-income': 'Select your household income level or whether you get Universal Credit.' }
    return res.render('universal-credit-income')
  }
  if (answer === 'yes') {
    return res.redirect('/child-school-age')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-universal-credit-income')
  } else if (answer === 'not-applicable') {
    return res.redirect('/child-school-age')
  }
  res.redirect('/child-school-age')
})

router.get('/ineligible-universal-credit-income', function (req, res) {
  res.render('ineligible-universal-credit-income')
})

router.get('/child-school-age', function (req, res) {
  res.render('child-school-age')
})

router.post('/child-school-age', function (req, res) {
  const answer = req.session.data['child-school-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'child-school-age': 'Select yes if your child is in full-time education at a state school in England.' }
    return res.render('child-school-age')
  }
  if (answer === 'yes') {
    return res.redirect('/child-name')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-child-school-age')
  }
  res.redirect('/child-name')
})

router.get('/ineligible-child-school-age', function (req, res) {
  res.render('ineligible-child-school-age')
})

router.get('/child-name', function (req, res) {
  res.render('child-name')
})

router.post('/child-name', function (req, res) {
  const answer = req.session.data['child-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'child-name': 'Enter your child\'s full name.' }
    return res.render('child-name')
  }
  res.redirect('/school-name')
})

router.get('/school-name', function (req, res) {
  res.render('school-name')
})

router.post('/school-name', function (req, res) {
  const answer = req.session.data['school-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'school-name': 'Enter the name of your child\'s school.' }
    return res.render('school-name')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
