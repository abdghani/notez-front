import toastr from 'toastr'
import 'toastr/build/toastr.min.css'


toastr.options = {
    positionClass : 'toast-top-full-width',
    hideDuration: 300,
    timeOut: 1000
}
toastr.clear()

export default toastr;