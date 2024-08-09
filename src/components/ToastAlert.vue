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
import { ref, watch, onMounted, onUnmounted } from 'vue';

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
    setup(props, { emit }) {
        const audio = ref(null);
        const hasInteracted = ref(false);

        const playNotificationSound = () => {
            if (hasInteracted.value && audio.value) {
                audio.value.play().catch(error => {
                    console.error('Error playing notification sound:', error);
                });
            }
        };

        const hide = () => {
            emit('update:show', false);
        };

        const setInteracted = () => {
            hasInteracted.value = true;
        };

        watch(() => props.show, (newVal) => {
            if (newVal) {
                playNotificationSound();
                setTimeout(() => {
                    hide();
                }, 1500); // Hide after 1.5 seconds
            }
        });

        onMounted(() => {
            audio.value = new Audio('/ok.wav');
            document.addEventListener('click', setInteracted);
        });

        onUnmounted(() => {
            document.removeEventListener('click', setInteracted);
        });

        return {
            hide,
            playNotificationSound
        };
    }
};
</script>
