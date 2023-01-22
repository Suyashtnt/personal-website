<script lang="ts">
    import 'atropos/css'
    import Atropos from 'atropos/svelte'
</script>

<section class="flex flex-row flex-wrap justify-around content-center">
    <Atropos class="rounded-xl aspect-square pa-8">
        <!-- placeholder image here -->
        <div class="flex content-center h-full w-full justify-center">
            <img src="https://picsum.photos/400/500" alt="placeholder" class="rounded-xl" />
        </div>
    </Atropos>
    <div class="flex-grow">
        <h1 class="text-9xl w-max leading-30">
            Hi,
            <br>
            I'm TNTMan1671
            <h2 class="text-6xl mt-0 flex justify-between leading-0 desc">
                <p class="word">Student</p> <p class="word">Programmer</p> <p class="word">Gamer</p>
            </h2>
        </h1>
    </div>
</section>

<style>
    /* https://www.youtube.com/watch?v=owpaafxvkjU go brrr */

    .desc:has(.word:hover) .word:not(:hover) {
        opacity: 0.2;
    }
</style>