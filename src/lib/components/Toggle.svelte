
<script lang="ts">
    import type { ChangeEventHandler } from 'svelte/elements';

    export let checked: boolean;
    export let labelClass = '';
    export let onChange: ChangeEventHandler<HTMLInputElement> = () => {};
</script>

<label class="toggle-label {labelClass}">
    <slot />
    <input
        type="checkbox"
        bind:checked
        on:change={onChange}
    />
    <div class="toggle-ui flex flex-shrink-0 items-center w-11 h-6 rounded-full relative cursor-pointer bg-slate-500" />
</label>

<style lang="scss">
    .toggle-label {
        input {
            display: none;

            & + .toggle-ui {
                &::before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    background-color: white;
                    border-radius: 9px;
                }
            }

            &:checked + .toggle-ui {
                @apply bg-cyan-500;

                &::before {
                    transform: translateX(20px);
                }
            }
        }
    }
</style>