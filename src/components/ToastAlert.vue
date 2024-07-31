<template>
    <div v-if="show" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">🔔 Notification</strong>
            <button type="button" class="btn-close" @click="hide" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-light text-center">
            <span class="text-muted fs-6">{{ message }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        }
    },
    watch: {
        show(newVal) {
            if (newVal) {
                // Play notification sound
                const audio = new Audio('/ok.wav');
                audio.play();

                setTimeout(() => {
                    this.hide();
                }, 1500); // Hide after 1.5 seconds
            }
        }
    },
    methods: {
        hide() {
            this.$emit('update:show', false);
        }
    }
};
</script>
