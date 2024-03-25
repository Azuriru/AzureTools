<script lang="ts">
    const center = 'flex justify-center items-center';
</script>

<div class="videos-wrapper flex flex-col h-96 w-full overflow-hidden">
    <div class="videos-body flex flex-col h-full bg-slate-900">
        <div class="flex flex-grow gap-2 overflow-y-scroll">
            <div class="flex flex-col gap-2 flex-shrink-0 w-full">
                {#each new Array(14).fill(null) as _, index (index)}
                    <div class="flex">
                        <div class="h-12 w-2/5 sticky left-0 flex-shrink-0 whitespace-nowrap bg-red-500/10 {center}">
                            doesnt scroll
                        </div>
                        <div class="h-12 flex-shrink-0 {center} gap-2 flex-grow bg-green-600">
                            {#each new Array(14).fill(null) as _, index (index)}
                                <div class="flex w-40 gap-2 bg-cyan-400">
                                    a
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>