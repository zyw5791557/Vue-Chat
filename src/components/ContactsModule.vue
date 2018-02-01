<script>
export default {
    name: 'ContactsModule',
    props: {
        lock: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            open: false
        }
    },
    watch: {
        lock () {
            this.toggle();
        }  
    },
    methods: {
        toggle () {
            this.open = !this.open
        }
    }
}
</script>

<template>
    <div>
        <mu-drawer left :open="open" @close="toggle()">
            <mu-appbar title="Emlice Chat"/>
            <mu-list>
            <mu-list-item title="Menu Item 1"/>
            <mu-list-item title="Menu Item 2"/>
            <mu-list-item title="Menu Item 3"/>
            <mu-list-item @click.native="open = false" title="Close"/>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<style lang="scss" scoped>

</style>

