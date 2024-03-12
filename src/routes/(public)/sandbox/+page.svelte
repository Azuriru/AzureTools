<script lang="ts">
    const center = 'flex justify-center items-center';
</script>

<div class="videos-wrapper flex flex-col h-96 w-full overflow-hidden">
    <div class="videos-header flex">
        Videos
    </div>
    <div class="videos-body flex h-full gap-2 bg-slate-900">
        <div class="videos-main flex flex-col  bg-slate-600">
            <div class="video-thumbnail flex bg-red-500 min-h-80 aspect-video">
                thumbnail
            </div>
            <div class="video-desc flex">
                description
            </div>
        </div>
        <div class="videos-suggested flex flex-col flex-grow gap-2">
            {#each new Array(4).fill(null) as _, index (index)}
                <div class="video-container flex flex-grow">
                    <div class="video-thumbnail bg-red-500 aspect-video {center}">
                        thumbnail
                    </div>
                    <div class="video-desc {center} flex-grow bg-green-300">
                        video metadata
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>