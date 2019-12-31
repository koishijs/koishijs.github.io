<script>

import parentLayout from '@parent-theme/layouts/Layout.vue'

const getSidebarItems = parentLayout.computed.sidebarItems
parentLayout.computed.sidebarItems = function () {
  const items = getSidebarItems.call(this)
  items.forEach(item => {
    if (!item.headers) return
    item.headers.forEach(header => {
      header.title = header.title.replace(/\(.+/, '()')
    })
  })
  return items
}

export default parentLayout

</script>
