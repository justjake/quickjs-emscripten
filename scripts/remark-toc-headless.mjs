// Custom remark plugin that inserts a table of contents after the first
// paragraph, without requiring a heading marker.
import { toc } from "mdast-util-toc"

export default function remarkTocHeadless(options = {}) {
  const { maxDepth = 3 } = options

  return (tree) => {
    // Find the index of the first h2 heading
    let firstH2Index = -1
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i]
      if (node.type === "heading" && node.depth === 2) {
        firstH2Index = i
        break
      }
    }

    if (firstH2Index === -1) {
      // No h2 found, don't insert TOC
      return
    }

    // Generate TOC starting from the first h2 (skip h1 class name)
    // Create a subtree containing only nodes from firstH2Index onwards
    const subtree = {
      type: "root",
      children: tree.children.slice(firstH2Index),
    }

    const result = toc(subtree, { maxDepth })

    if (!result.map) {
      // No TOC generated (not enough headings)
      return
    }

    // Insert the TOC list before the first h2
    tree.children.splice(firstH2Index, 0, result.map)
  }
}
