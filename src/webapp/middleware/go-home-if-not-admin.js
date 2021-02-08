export default function({app, redirect}) {
  if (!app.$auth.loggedIn || !app.$auth.user.is_admin) return redirect('/')
}
