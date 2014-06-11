// Alert Extension
// ===============================

$('.alert').attr('role', 'alert')
$('.close').removeAttr('aria-hidden').wrapInner('<span aria-hidden="true"></span>').append('<span class="sr-only">Close</span>')
