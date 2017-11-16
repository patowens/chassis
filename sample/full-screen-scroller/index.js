
var state = {
  pageIndex: 1,
  loop: true
}

function incrementPageIndex () {
  return ++state.pageIndex;
}

function resetPageIndex () {
  return state.pageIndex = 1;
}

function getNextPageIndex (currentIndex, opts) {
  var el = document.getElementsByClassName(`page-${currentIndex +1}`)[0];
  
  if (el) {
    return incrementPageIndex()
  }

  if (!el && opts.loop) {
    return resetPageIndex()
  }

}

function progress (currentIndex, nextIndex) {
  // raise the z-index of the next page before the transition begins
  document.getElementsByClassName(`page-${nextIndex}`)[0].classList.add('raise');
  document.getElementsByClassName(`page-${nextIndex}`)[0].classList.add('show');
    
  // wait for new page to appear, remove previous.
  setTimeout(function() {
    // now the transition is complete, remove the z-index bump.
    document.getElementsByClassName(`page-${nextIndex}`)[0].classList.remove('raise');
    // remove the show class from the previous page.
    document.getElementsByClassName(`page-${currentIndex}`)[0].classList.remove('show');
  }, 400)
}

function getElementIndex (element) {
  return [...element.parentNode.children].indexOf(element);
}

function checkKey(e) {
  if (e.keyCode === 39 || e.keyCode === 40) {
    progress(state.pageIndex, getNextPageIndex(state.pageIndex, { loop: state.loop }));  
  }
}

document.onkeydown = checkKey

document.addEventListener('click', function (e) {
  progress(state.pageIndex, getNextPageIndex(state.pageIndex, { loop: state.loop }));
});