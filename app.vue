<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-[url('/assets/images/bg-pattern.png')]">

        <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 drop-shadow-lg">
            Analyze Image with DALL-E
        </h1>

        <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
            <!-- Dropdown to Select Example Image -->
            <div class="mb-4 w-full">
                <label for="imageSelect" class="text-gray-600 mb-2 block">Select an example image:</label>
                <select v-model="selectedImage" id="imageSelect"
                    class="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-800">
                    <option v-for="(imageLabel, imageKey) in images" :key="imageKey" :value="imageKey">
                        {{ imageLabel }}
                    </option>
                </select>
            </div>

            <!-- Display Selected Example Image -->
            <div class="flex flex-col items-center mb-6" v-if="selectedImage">
                <img :src="imageMap[selectedImage]" :alt="selectedImage"
                    class="w-full h-auto object-cover rounded-lg" />
            </div>

            <!-- Example Prompt Description -->
            <p class="text-gray-500 mb-4 text-center">
                Example Prompt: <em>{{ examplePrompt }}</em>
            </p>

            <!-- Form -->
            <form @submit.prevent="analyzeImageWithDallE">
                <!-- Textarea for Prompt -->
                <textarea v-model="query" placeholder="Describe what you want to analyze about the image..."
                    class="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg mb-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4" required></textarea>

                <!-- Analyze Button -->
                <button type="submit" :disabled="loading"
                    class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition duration-200 disabled:opacity-50">
                    <div v-if="loading"
                        class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>{{
                        loading ? "Analyzing Image..." : "Analyze"
                    }}</span>
                </button>
            </form>

            <!-- Error Message -->
            <p v-if="error" class="mt-4 text-red-500 text-center">
                {{ error }}
            </p>

            <!-- Display Analysis Result as Formatted Markdown -->
            <div v-if="analysisResult" class="mt-6">
                <p class="text-gray-800 font-semibold">Analysis Result:</p>
                <div class="text-gray-700 mt-2" v-html="formattedResult"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { marked } from "marked"

// Map images with their display names and URLs in the public folder
const images = {
    "building.jpg": "Building",
    "cheese-1.jpg": "Cheese 1",
    "cheese-2.jpg": "Cheese 2",
    "egg.jpg": "Egg",
    "menu.png": "Menu",
}

// Image map with URLs from public folder
const imageMap = {
    "building.jpg": "/images/building.jpg",
    "cheese-1.jpg": "/images/cheese-1.jpg",
    "cheese-2.jpg": "/images/cheese-2.jpg",
    "egg.jpg": "/images/egg.jpg",
    "menu.png": "/images/menu.png",
}

// Prompts for each image
const prompts = {
    "building.jpg":
        "Describe the architectural style and prominent features of the building.",
    "cheese-1.jpg":
        "Describe the texture, color, and appearance of the cheese.",
    "cheese-2.jpg":
        "Identify the type of cheese and any unique characteristics.",
    "egg.jpg": "To which type of bird does this egg belong?",
    "menu.png": 
        `Based on this menu, please recommend meal options considering the following: I have a big appetite, am allergic to shellfish, 
        and crave a dessert that's both sweet and tart. I'd like to keep my total spend under $30"`,
}

const selectedImage = ref("building.jpg")
const query = ref("")
const loading = ref(false)
const error = ref(null)
const analysisResult = ref(null)

// Computed property to get the prompt for the selected image
const examplePrompt = computed(() => prompts[selectedImage.value])

// Computed property to format the analysis result as Markdown
const formattedResult = computed(() => marked(analysisResult.value || ""))

const analyzeImageWithDallE = async () => {
    loading.value = true
    error.value = null
    analysisResult.value = null

    try {
        const response = await $fetch("/api/bot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: query.value,
                image: selectedImage.value,
            }),
        })
        if (response.message) {
            // If there is an error message in the response, handle it
            error.value = response.message
        } else {
            analysisResult.value = response.output
        }
    } catch (err) {
        error.value =
            "An error occurred while analyzing the image. Please try again."
    } finally {
        loading.value = false
        query.value = ""
    }
}
</script>
