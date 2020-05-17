<template>
    <footer>
        <div class="content has-text-centered">
            <p>&copy; Janu - v{{version}}</p>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            version: process.env.APP_VERSION
        }
    }
}
</script>